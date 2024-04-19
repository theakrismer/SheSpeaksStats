// Handles displaying any applicable errors to a form

function ErrorDisplay({errorList}) {

    return (
        <div>
            {errorList.errorMessages.map((msg) => (
                <p className="text-red-500 italic">{msg}</p>
            ))}
        </div>
    )
}

export { ErrorDisplay }