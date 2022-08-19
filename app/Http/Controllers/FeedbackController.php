<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Http\Requests\Feedback\StoreRequest;
use App\Http\Services\EmailService;

class FeedbackController extends Controller
{
    public function store(StoreRequest $request)
    {
        try {
            $feedback = Feedback::create($request->all());
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
