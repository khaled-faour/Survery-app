<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Question;
use App\Http\Models\User;

class Survey extends Model
{
    use HasFactory, SoftDeletingTrait;

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
