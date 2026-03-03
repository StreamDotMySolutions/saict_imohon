<?php
namespace App\Helpers;

class PaginationHelper
{
    public static function addNumbering($paginator): void
    {
        $start = ($paginator->currentPage() - 1) * $paginator->perPage() + 1;
        $paginator->getCollection()->transform(function ($item, $index) use ($start) {
            $item->numbering = $start + $index;
            return $item;
        });
    }
}
