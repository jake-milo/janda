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

Route::apiResource('contact-lenses', 'ContactLensController');
Route::post('/contact-lenses/{contact_lense}/restore', 'ContactLens@restore');

Route::apiResource('brands', 'BrandController');
Route::post('/brands/{brand}/restore', 'BrandController@restore');

Route::apiResource('brands.types', 'TypeController');
Route::post('/brands/{brand}/types/{type}/restore', 'TypeController@restore');

