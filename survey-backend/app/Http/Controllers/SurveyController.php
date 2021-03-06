<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Option;


class SurveyController extends Controller
{
    //
    public function add(Request $request){

        $surveyTitle = $request->surveyTitle;
        $questionsList = $request->questions;

        

        $survey = new Survey();
        $survey->title = $surveyTitle;
        $survey->user_id = Auth::user()->id;
        $survey->save();


        foreach($questionsList as $questionObject){
            $choices = [];

            foreach($questionObject['choices'] as $choice){
                $choices[] = new Option(['value'=>$choice]);
            }

            $question = new Question();
            $question->survey_id = $survey->id;
            $question->type = $questionObject['type'];
            $question->question = $questionObject['question'];
            $question->description = $questionObject['description'];
            $question->isMultiple = $questionObject['isMultiple'];
            $question->isDropdown = $questionObject['isDropdown'];
            $question->save();

            $question->options()->saveMany($choices);
            
        }

        
        // attach survey to user
        return response()->json([
            "status"=>"success"
        ], 200);
    }
    public function get($id){

        $survey = Survey::where('closed_at', null)->with('questions.options')->get()->find($id);
        return response()->json($survey, 200);
    }
    
    public function getAll(){
        $surveys = Survey::with('questions.options')->get();

        return response()->json([
            'surveys'=>$surveys
        ]);
    }

    public function close(Request $request){
        $survey = Survey::find($request->id);
        $survey->closed_at = now();
        $survey->save();

        $surveys = Survey::Where('user_id', Auth::user()->id)->get();
        return response()->json([
            "status"=>"success",
            "surveys"=>$surveys
        ], 200);
    }
}
