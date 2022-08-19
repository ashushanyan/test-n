<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Mail;

class EmailService
{
    const TO_EMAIL = 'customer@feedback.com';

    public static function sendFeedback($data) {
//        dd($data->toArray());
        Mail::send('emails.feedback', $data->toArray(), function ($message) {
            $message
                ->to(self::TO_EMAIL)
                ->subject('Feedback Message');
        });
    }
}
