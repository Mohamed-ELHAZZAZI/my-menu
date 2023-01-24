<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenusController extends Controller
{
    public function create(Request $request)
    {
        $menu = $request->all();
        $data = [
            'name' => $menu['info']['name'],
            'user_id' => 5,
            'street' => $menu['info']['street'],
            'email' => $menu['info']['email'],
            'phone' => $menu['info']['phone'],
            'type' => $menu['info']['type'],
            'template_id' => $menu['info']['template_id'],
            'list' => $menu['list'],
        ];
        $menu = Menu::create($data);

        return response($menu);
    }



    public function get()
    {
        $menus = Menu::where('user_id', 5)->get();

        return response($menus);
    }
}
