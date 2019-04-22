<?php
use App\Http\Controllers\Api\ContactLensController;
use App\Http\Controllers\Api\TypeController;

/*
 * All routes for the API. Any route in this file
 * will be prefixed with /api and is behind the
 * 'auth' middleware.
 */

Route::apiResource('patients', 'PatientController');

Route::apiResource('practices', 'PracticeController');

Route::apiResource('labs', 'LabController');

Route::apiResource('lab-orders', 'LabOrderController');

Route::apiResource('contact-lenses', 'ContactLensController');

Route::apiResource('brands', 'BrandController');

Route::apiResource('brands.types', 'TypeController');

Route::post('/brands/{brand}/types/{type}/restore', 'TypeController@restore');

