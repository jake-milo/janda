<?php

namespace App\Exports;

use App\Models\Stock\Brand;
use App\Models\Stock\Type;
use App\Models\Stock\Variant;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class FrameExport implements FromCollection, WithHeadings
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $brands = Brand::with([
            'manufacturer',
            'types' => function ($q) {
                return $q->with('variants');
            },
        ])->get();

        return $brands->map(function ($brand) {
            return $brand->types->map(function ($type) use ($brand) {
                return $type->variants->map(function ($variant) use ($type, $brand) {
                    return array_merge(
                        [
                            'brand' => $brand->name,
                            'manufacturer' => $brand->manufacturer->name,
                        ],
                        $this->typeToArray($type),
                        $this->variantToArray($variant),
                    );
                });
            })->flatten(1);
        })->flatten(1);
    }

    protected function typeToArray(Type $type): array
    {
        return [
            'name' => $type->name,
            'buy' => $type->buy ? $type->buy / 100 : null,
            'sell' => $type->sell ? $type->sell / 100 : null,
            'year' => $type->year,
        ];
    }

    protected function variantToArray(Variant $variant): array
    {
        $data = [
            'color' => $variant->color,
            'eyesize' => $variant->eyesize,
            'dbl' => $variant->dbl,
            'quantity' => $variant->quantity,
        ];

        if ($variant->buy != null) {
            $data['buy'] = $variant->buy / 100;
        }

        if ($variant->sell != null) {
            $data['sell'] = $variant->sell / 100;
        }

        if ($variant->year != null) {
            $data['year'] = $variant->year;
        }

        return $data;
    }

    public function headings(): array
    {
        return [
            'Brand',
            'Manufacturer',
            'Name',
            'Buy',
            'Sell',
            'Year',
            'Color',
            'Eyesize',
            'DBL',
            'Quantity',
        ];
    }
}
