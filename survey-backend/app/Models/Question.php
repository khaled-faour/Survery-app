<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Survey;
use App\Models\Option;
use App\Models\Answer;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'survey_id',
        'type',
        'question',
        'description',
        'isMultiple',
        'isDropdown'
    ];

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
