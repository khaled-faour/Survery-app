<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use App\Models\Answer;


class Option extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'value'
    ];

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }

}
