<x-app-layout>
    <x-slot name="header">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Available Chores</h2>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                @if(session('status'))
                    <div class="mb-4 text-green-600">{{ session('status') }}</div>
                @endif

                @if($chores->isEmpty())
                    <div>No chores are available to claim right now.</div>
                @else
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-2">Title</th>
                                <th class="pb-2">Points</th>
                                <th class="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($chores as $chore)
                                <tr class="border-t">
                                    <td class="py-2">{{ $chore->title }}</td>
                                    <td class="py-2">{{ $chore->points_value }}</td>
                                    <td class="py-2">
                                        <form method="POST" action="{{ route('chores.claim', $chore) }}" style="display:inline">
                                            @csrf
                                            <button type="submit" class="px-3 py-1 bg-green-600 text-white rounded">Claim</button>
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
