<?php

/*
 * All routes for the API. Any route in this file
 * will be prefixed with /api and is behind the
 * 'auth' middleware.
 */

Route::apiResource('patients', 'PatientController');
Route::post('/patients/{patient}/restore', 'PatientController@restore');

Route::apiResource('practices', 'PracticeController');
Route::post('/practices/{practice}/restore', 'PracticeController@restore');

Route::apiResource('labs', 'LabController');
Route::post('/labs/{lab}/restore', 'LabController@restore');

Route::apiResource('lab-orders', 'LabOrderController');
Route::post('/lab-orders/{lab_order}/restore', 'LabOrderController@restore');


Route::apiResource('contact-lenses', 'ContactLensController', [
    'parameters' => [
        'contact-lenses' => 'contact_lens',
    ],
]);
Route::post('/contact-lenses/{contact_lens}/restore', 'ContactLensController@restore');


Route::apiResource('contact-lens-brands', 'ContactLens\BrandController', [
    'parameters' => [
        'contact-lens-brands' => 'brand',
    ],
]);
Route::post('/contact-lens-brands/{brand}/restore', 'ContactLens\BrandController@restore');


Route::apiResource('contact-lens-brands.types', 'ContactLens\TypeController', [
    'parameters' => [
        'contact-lens-brands' => 'brand',
        'contact-lens-types' => 'type',
    ],
]);
Route::post('/contact-lens-brands/{brand}/types/{type}/restore', 'ContactLens\TypeController@restore');


Route::apiResource('brands', 'Stock\BrandController');
Route::post('/brands/{brand}/restore', 'Stock\BrandController@restore');

Route::apiResource('brands.types', 'Stock\TypeController');
Route::post('/brands/{brand}/types/{type}/restore', 'Stock\TypeController@restore');

