<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;

class AnswerController extends Controller
{
    //
    public function add(Request $request){

       $answers = $request->answers;
        foreach($answers as $ans){
            $answer = new Answer();
            $answer->question_id = $ans['question_id'];
            if(array_key_exists('option_id', $ans)){
                $answer->option_id = $ans['option_id'];
            }else{
                $answer->option_id = null;
            }
            if(array_key_exists('text_answer', $ans)){
                $answer->text_answer = $ans['text_answer'];
            }else{
                $answer->text_answer = null;
            }
            $answer->save();
        }

        
        return response()->json([
            "status"=>"success"
        ]);
    }
}
