<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDepartment;

class UserDepartmentController extends Controller
{
    public function index(){

        $userDepartments = UserDepartment::defaultOrder()->get()->toTree();

        return response()->json([
            'user_departments' => $userDepartments
        ]);
    }

    public function store(Request $request)
    {

        $userDepartment =  UserDepartment::create($request->only('name')); // create node

        if ($request->has('parent_id')) {
            $parent_id = $request->input('parent_id'); // submitted by dropdown

            if (!is_null($parent_id) && !empty($parent_id)) {
                $node = UserDepartment::find($parent_id); // find the node
                $node->appendNode($userDepartment); // assign created department to that node
            } 
        }

        return response()->json(['message' => 'success']);
    }

    public function update(Request $request, UserDepartment $userDepartment)
    {
        // Validate the request data if necessary
        $this->validate($request, [
            'name' => 'required|string|max:255',
        // Add validation rules for other attributes
        ]);

        // Update the category attributes
        $userDepartment->name = $request->input('name');
 
        // Save the changes to the database
        $userDepartment->save();

        return response()->json(['message' => 'success']);
    }

    public function destroy(UserDepartment $userDepartment)
    {
        $userDepartment->delete(); // delete the node
        return response()->json(['message' => 'success']);
    }

    public function ordering(UserDepartment $userDepartment, $direction)
    {
        $node = UserDepartment::find($userDepartment->id);

        switch($direction){
            case 'up':
                $node->up();
            break;

            case 'down':
                $node->down();
            break;
        }
        return response()->json(['message' => 'success']);
        //$node->down();
    }
}

