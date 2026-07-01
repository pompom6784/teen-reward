<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                    @if(optional(auth()->user())->role === 'parent')
                        <div class="mt-4 space-y-2">
                            <a href="{{ route('chores.index') }}" class="inline-block px-4 py-2 bg-blue-600 text-white rounded">{{ __('Manage chores') }}</a>
                            <a href="{{ route('claims.pending') }}" class="inline-block px-4 py-2 bg-yellow-600 text-white rounded">{{ __('Pending claims') }}</a>
                        </div>
                    @endif

                    @if(optional(auth()->user())->role === 'teen')
                        <div class="mt-4 space-y-2">
                            <a href="{{ route('chores.assigned') }}" class="inline-block px-4 py-2 bg-green-600 text-white rounded">{{ __('My chores') }}</a>
                            <a href="{{ route('claims.index') }}" class="inline-block px-4 py-2 bg-indigo-600 text-white rounded">{{ __('My claims') }}</a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
