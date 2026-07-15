function FieldError({ message }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-sm text-rose-300">{message}</p>;
}

export default FieldError;
