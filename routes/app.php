<?php

/*
 * Routes that are accessible when not logged in.
 */
Route::group(['middleware' => 'guest'], function () {
     // Login routes
     Route::get('/login', 'LoginController@showLoginForm')->name('login');
     Route::post('/login', 'LoginController@login');
});

/*
 * Routes that are accesible when logged in.
 */
Route::group(['middleware' => 'auth'], function () {
     // Logout route
     Route::get('/logout', 'LoginController@logout')
          ->name('logout');

     // Route that catches all paths and sends them to the
     // AppController. The controller loads the react frontend
     // app which takes care of routing on the client side.
     Route::get('/{slug?}', 'AppController@app')
          ->where('slug', '.*')
          ->name('app');
});
