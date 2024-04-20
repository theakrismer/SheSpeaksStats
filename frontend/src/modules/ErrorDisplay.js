// Handles displaying any applicable errors to a form

function ErrorDisplay({errorList}) {

    return (
        <div>
            {errorList.errorMessages.map((msg, index) => (
                <p className="text-red-500 italic">{index + 1 + ": " + msg}</p>
            ))}
        </div>
    )
}

export { ErrorDisplay }