<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:5',
            'contact' => 'required|unique:contacts|regex:/^\+(55|1)\d{10,11}$/',
            'email' => 'required|email|unique:contacts',
        ]);

        $contact = Contact::create($request->all());
        return response()->json($contact, 201);
    }

    public function show(Contact $contact)
    {
        return response()->json($contact);
    }

    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'name' => 'required|string|min:5',
            'contact' => 'required|regex:/^\+(55|1)\d{10,11}$/|unique:contacts,contact,' . $contact->id,
            'email' => 'required|email|unique:contacts,email,' . $contact->id,
        ]);

        $contact->update($request->all());
        return response()->json($contact);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
