// Handles displaying any applicable errors to a form

function ErrorDisplay({errorList}) {

    return (
        <div>
            {errorList.errorMessages.map((msg, index) => (
                <p key={msg+index} className="text-red-500 text-base italic">{ "Error: " + msg}</p>
            ))}
        </div>
    )
}

export { ErrorDisplay }