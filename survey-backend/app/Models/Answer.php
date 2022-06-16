<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Option;
use App\Http\Models\User;


class Answer extends Model
{
    use HasFactory, SoftDeletingTrait;

    public function option(){
        return $this->belongsTo(Option::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
