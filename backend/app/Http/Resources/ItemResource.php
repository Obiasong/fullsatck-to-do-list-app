<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|JsonSerializable|Arrayable
    {
        return parent::toArray($request);
//        return [
//            'item_id' => $this->id,
//            'title' => $this->item,
//            'description' => $this->description,
//            'photo' => $this->photo,
//            'status' => $this->status,
//            'created_at' => $this->created_at,
//            'updated_at' => $this->updated_at
//        ];
    }
}
