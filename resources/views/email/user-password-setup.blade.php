@component('mail::message')
# Setup your {{ config('app.name') }} account

{{ $initiatedBy ? $initiatedBy->name : 'Someone' }} created an account for you. Use the button below to setup your
password.

@component('mail::button', ['url' => $url])
Set Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent