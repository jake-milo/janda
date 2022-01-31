<?php

namespace App\Http\Controllers\Api\Stock;

use App\Exports\FrameExport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Facades\Excel;

class CsvExportController extends Controller
{
    public function __invoke()
    {
        $now = Carbon::now()->format('Y-m-d-H-i-s');

        return (new FrameExport)->download("frames-$now.csv");
    }
}
