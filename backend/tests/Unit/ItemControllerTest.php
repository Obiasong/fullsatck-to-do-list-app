<?php

namespace Tests\Unit;

use App\Models\Item;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ItemControllerTest extends TestCase
{
    /**
     * Test that index responds with status 200 and returns valid data format.
     *
     * @return void
     */
    public function test_index_returns_ok_status_and_response_data_is_in_valid_format(): void
    {
        $this->getJson('/api/v1/items')->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(
                [
                    'data' => [
                        '*' => [
                            'id',
                            'item',
                            'description',
                            'photo',
                            'status',
                            'created_at',
                            'updated_at',
                        ]
                    ]
                ]
            );
    }

    /**
     * Test that index with search parameter returns valid format and with items that match the search parameter
     *
     * @return void
     */
    public function test_index_with_search_param_returns_ok_status_and_response_data_is_in_valid_format(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );
        $name = $item->item;
        $this->getJson('/api/v1/items/?search=' . $name)->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(
                [
                    'data' => [
                        '*' => [
                            'id',
                            'item',
                            'description',
                            'photo',
                            'status',
                            'created_at',
                            'updated_at',
                        ]
                    ]
                ]
            )
            ->assertJsonFragment(['item' => $name]);

    }

    /**
     * Test that index with search parameter returns valid format and no data if no item has search parameter
     *
     * @return void
     */
    public function test_index_search_returns_valid_format_and_works_for_items_not_found(): void
    {

        $name1 = 'failed_search';
        $this->getJson('/api/v1/items/?search=' . $name1)->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(
                [
                    'data' => [
                        '*' => [
                            'id',
                            'item',
                            'description',
                            'photo',
                            'status',
                            'created_at',
                            'updated_at',
                        ]
                    ]
                ]
            )
            ->assertJsonMissing(['item' => $name1]);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_item_is_created_successfully(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );

        $this->getJson('/api/v1/items/' . $item->id)->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $item->id,
                    'item' => $item->item,
                    'description' => $item->description,
                    'photo' => $item->photo,
                    'status' => $item->status,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ]
            ]);
    }

    /**
     * Test that delete an item works and responds with status 200
     *
     * @return void
     */
    public function test_item_is_destroyed(): void
    {
        $data = [
            'item' => $this->faker->sentence(3, true),
            'description' => $this->faker->paragraph(3, true),
            'photo' => $this->faker->imageUrl,
            'status' => 'pending'
        ];
        $item = Item::create(
            $data
        );
        $this->deleteJson('/api/v1/items/' . $item->id)
            ->assertOk()
            ->assertJsonFragment(['message' => 'Item deleted successfully']);
        $this->assertDatabaseMissing('items', $data);
    }

    /**
     * Test that items not found returns 404
     *
     * @return void
     */
    public function test_item_not_found(): void
    {
        $data = [
            'item' => $this->faker->sentence(3, true),
            'description' => $this->faker->paragraph(3, true),
            'photo' => $this->faker->imageUrl,
            'status' => 'pending'
        ];
        $item = Item::create(
            $data
        );
        $this->getJson('/api/v1/items/' . 5)
            ->assertNotFound();
    }

    /**
     * Test that item is updated and the valid response is sent.
     *
     * @return void
     */
    public function test_update_item_returns_correct_data(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );

        Storage::fake('public');

        $file = UploadedFile::fake()->image('item.jpg');

        $data = [
            'item' => $this->faker->sentence(3, true),
            'description' => $this->faker->paragraph(3, true),
            'photo' => $file
        ];


        $this->putJson('/api/v1/items/' . $item->id, $data)
            ->assertOk()
            ->assertExactJson([
                'data' => [
                    'id' => $item->id,
                    'item' => $data['item'],
                    'description' => $data['description'],
                    'photo' => 'items/' . $file->hashName(),
                    'status' => $item->status,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ],
                'message' => 'Item updated successfully',
            ]);

        Storage::disk('public')->assertExists('items/' . $file->hashName());
    }

    /**
     * Test that failed validation rules return HTTP_UNPROCESSABLE_ENTITY (422) and have errors key with the
     * appropriate messages
     *
     * @return void
     */
    public function test_update_item_validations(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );
        $data = [
            'item' => $this->faker->sentence(3, true),
        ];

        $this->putJson('/api/v1/items/' . $item->id, $data)
            ->assertStatus(422)
            ->assertJsonStructure(['errors'])
            ->assertJsonFragment(['description' => ['The description field is required.']]);
    }

    public function test_create_item_post_request_returns_correct_data_and_file_is_uploaded_and_exists_in_public_disk()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('item.jpg');

        $data = [
            'item' => $this->faker->sentence(3, true),
            'description' => $this->faker->paragraph(3, true),
            'photo' => $file
        ];

        $this->postJson('/api/v1/items', $data)
            ->assertCreated()
            ->assertJsonFragment([
                'item' => $data['item'],
                'description' => $data['description'],
                'photo' => 'items/' . $file->hashName()
            ]);

        Storage::disk('public')->assertExists('items/' . $file->hashName());
    }

    /**
     * Test that failed validation rules when creating an item return HTTP_UNPROCESSABLE_ENTITY (422)
     * and have errors key with the appropriate messages
     *
     * @return void
     */
    public function test_create_item_validations(): void
    {
        $data = [
            'item' => $this->faker->sentence(3, true),
            'description' => $this->faker->paragraph(3, true),
            'photo' => $this->faker->imageUrl
        ];

        $this->postJson('/api/v1/items', $data)
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonStructure(['errors'])
            ->assertJsonFragment([
                'photo' => [
                    "The photo must be a file.",
                    "The photo must be a file of type: png, jpeg, jpg."
                ]
            ]);
    }

    public function test_create_user_missing_required_fields(): void
    {
        $payload = [
            'description' => $this->faker->paragraph(3, true),
            //item is missing
            //photo missing
        ];
        $this->postJson('/api/v1/items', $payload)
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonStructure(['errors'])
            ->assertJsonFragment([
                "item" => [
                    "The item field is required."
                ],
                "photo" => [
                    "The photo field is required."
                ]
            ]);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_get_item(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );

        $this->getJson('/api/v1/items/' . $item->id)
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $item->id,
                    'item' => $item->item,
                    'description' => $item->description,
                    'photo' => $item->photo,
                    'status' => $item->status,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ]
            ]);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_item_completed(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );
        $this->getJson('/api/v1/items/' . $item->id . '/complete')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonFragment(['status' => 'completed']);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_item_activated_successfully(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'pending'
            ]
        );
        $this->getJson('/api/v1/items/' . $item->id . '/activate')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonFragment(['status' => 'active']);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_activate_completed_item(): void
    {
        $item = Item::create(
            [
                'item' => $this->faker->sentence(3, true),
                'description' => $this->faker->paragraph(3, true),
                'photo' => $this->faker->imageUrl,
                'status' => 'completed'
            ]
        );
        $this->getJson('/api/v1/items/' . $item->id . '/activate')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonFragment(['status' => 'completed']);
    }
}
