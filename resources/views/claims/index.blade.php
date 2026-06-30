<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">My Claims</h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                @if($claims->isEmpty())
                    <div>No claims yet.</div>
                @else
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-2">Chore</th>
                                <th class="pb-2">Status</th>
                                <th class="pb-2">Points</th>
                                <th class="pb-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($claims as $claim)
                                <tr class="border-t">
                                    <td class="py-2">{{ $claim->chore->title }}</td>
                                    <td class="py-2">{{ $claim->status }}</td>
                                    <td class="py-2">{{ $claim->points_awarded ?? '-' }}</td>
                                    <td class="py-2">{{ $claim->created_at->toDateString() }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
