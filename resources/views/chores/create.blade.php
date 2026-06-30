<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">New Chore</h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                <form method="POST" action="{{ route('chores.store') }}">
                    @csrf

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Title</label>
                        <input name="title" value="{{ old('title') }}" class="mt-1 block w-full border rounded px-3 py-2" />
                        @error('title')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Description</label>
                        <textarea name="description" class="mt-1 block w-full border rounded px-3 py-2">{{ old('description') }}</textarea>
                        @error('description')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Points Value</label>
                        <input type="number" name="points_value" value="{{ old('points_value', 0) }}" class="mt-1 block w-full border rounded px-3 py-2" />
                        @error('points_value')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Recurrence</label>
                        <select name="recurrence_type" class="mt-1 block w-full border rounded px-3 py-2">
                            <option value="none" @if(old('recurrence_type') === 'none') selected @endif>One-time</option>
                            <option value="daily" @if(old('recurrence_type') === 'daily') selected @endif>Daily</option>
                            <option value="weekly" @if(old('recurrence_type', 'weekly') === 'weekly') selected @endif>Weekly</option>
                            <option value="monthly" @if(old('recurrence_type') === 'monthly') selected @endif>Monthly</option>
                            <option value="custom" @if(old('recurrence_type') === 'custom') selected @endif>Custom</option>
                        </select>
                        @error('recurrence_type')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Recurrence Interval</label>
                        <input type="number" name="recurrence_interval" value="{{ old('recurrence_interval') }}" class="mt-1 block w-full border rounded px-3 py-2" />
                        @error('recurrence_interval')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium">Recurrence Unit</label>
                        <select name="recurrence_unit" class="mt-1 block w-full border rounded px-3 py-2">
                            <option value="days" @if(old('recurrence_unit') === 'days') selected @endif>Days</option>
                            <option value="weeks" @if(old('recurrence_unit', 'weeks') === 'weeks') selected @endif>Weeks</option>
                            <option value="months" @if(old('recurrence_unit') === 'months') selected @endif>Months</option>
                        </select>
                        @error('recurrence_unit')<div class="text-red-600 text-sm">{{ $message }}</div>@enderror
                    </div>

                    <div class="flex items-center gap-3">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
                        <a href="{{ route('chores.index') }}" class="text-gray-600">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
