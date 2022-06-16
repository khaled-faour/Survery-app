<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Question;
use App\Http\Models\Answer;


class Option extends Model
{
    use HasFactory, SoftDeletingTrait;

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }

}
