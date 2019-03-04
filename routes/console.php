<?php

Artisan::command('make:api-controller {model}', function ($model) {
    $this->call('make:controller', [
        'name' => "Api/{$model}Controller",
        '--model' => "Models/$model",
        '--api' => true,
    ]);
})->describe('Creates an API Controller for the specified model.');
