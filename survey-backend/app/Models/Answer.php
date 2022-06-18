<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Option;
use App\Models\User;


class Answer extends Model
{
    use HasFactory, SoftDeletes;

    public function option(){
        return $this->belongsTo(Option::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
