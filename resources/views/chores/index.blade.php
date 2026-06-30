<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Chores</h2>
            <a href="{{ route('chores.create') }}" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded">New Chore</a>
        </div>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if(session('status'))
                <div class="mb-4 text-green-600">{{ session('status') }}</div>
            @endif

            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                @if($chores->isEmpty())
                    <div>No chores yet.</div>
                @else
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-2">Title</th>
                                <th class="pb-2">Points</th>
                                <th class="pb-2">Recurrence</th>
                                <th class="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($chores as $chore)
                                <tr class="border-t">
                                    <td class="py-2">{{ $chore->title }}</td>
                                    <td class="py-2">{{ $chore->points_value }}</td>
                                <td class="py-2">{{ ucfirst($chore->recurrence_type) }}@if($chore->recurrence_type === 'custom') (every {{ $chore->recurrence_interval }} {{ $chore->recurrence_unit }})@endif</td>
                                        <a href="{{ route('chores.edit', $chore) }}" class="text-blue-600 mr-3">Edit</a>

                                        <form action="{{ route('chores.destroy', $chore) }}" method="POST" style="display:inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-600" onclick="return confirm('Delete this chore?')">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
