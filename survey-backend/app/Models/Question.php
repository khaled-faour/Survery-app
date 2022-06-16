<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Survey;
use App\Http\Models\Option;
use App\Http\Models\Answer;

class Question extends Model
{
    use HasFactory, SoftDeletingTrait;

    public function survey(){
        return $this->belongsTo(Survey::class);
    }

    public function options(){
        return $this->hasMany(Option::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
