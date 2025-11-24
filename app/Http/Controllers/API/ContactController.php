<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function index()
    {
        return Contact::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:5',
            'contact' => ['required', 'unique:contacts,contact', 'regex:/^\+(55|1)\d{10,11}$/'],
            'email' => ['required', 'email', 'unique:contacts,email'],
        ]);

        return Contact::create($validated);
    }

    public function show(Contact $contact)
    {
        return $contact;
    }

    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:5',
            'contact' => ['required', Rule::unique('contacts')->ignore($contact->id), 'regex:/^\+(55|1)\d{10,11}$/'],
            'email' => ['required', 'email', Rule::unique('contacts')->ignore($contact->id)],
        ]);

        $contact->update($validated);
        return $contact;
    }

    public function destroy(Contact $contact)
    {
        $contact->delete(); // soft delete
        return response()->json(['message' => 'Contato deletado']);
    }
}
