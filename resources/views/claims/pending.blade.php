<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Pending Claims</h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                @if($claims->isEmpty())
                    <div>No pending claims.</div>
                @else
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-2">Chore</th>
                                <th class="pb-2">Teen</th>
                                <th class="pb-2">Submitted</th>
                                <th class="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($claims as $claim)
                                <tr class="border-t">
                                    <td class="py-2">{{ $claim->chore->title }}</td>
                                    <td class="py-2">{{ $claim->user->name }} ({{ $claim->user->email }})</td>
                                    <td class="py-2">{{ $claim->created_at->toDateString() }}</td>
                                    <td class="py-2">
                                        <form method="POST" action="{{ route('claims.approve', $claim) }}" style="display:inline">
                                            @csrf
                                            <button class="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                                        </form>

                                        <form method="POST" action="{{ route('claims.reject', $claim) }}" style="display:inline">
                                            @csrf
                                            <button class="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
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
