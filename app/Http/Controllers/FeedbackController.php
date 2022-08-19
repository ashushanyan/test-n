<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Http\Services\EmailService;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required',
            'phone' => 'required',
            'email' => 'email|nullable',
        ]); // it's also can be StoreRequest

        try {
            $feedback = Feedback::create($data);
            EmailService::sendFeedback($feedback);

            return response([
               'error' => false,
               'message' => 'success',
            ]);

        } catch (\ErrorException $e) {
            return json_encode([
                'error' => true,
                'message' => 'Something went wrong!',
            ]);
        }
    }
}
