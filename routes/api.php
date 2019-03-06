<?php

/*
 * All routes for the API. Any route in this file
 * will be prefixed with /api and is behind the
 * 'auth' middleware.
 */

Route::apiResource('patients', 'PatientController');

Route::apiResource('practices', 'PracticeController');

Route::apiResource('labs', 'LabController');

Route::apiResource('lab-orders', 'LabOrderController');

