import traceback

def analyze_code(code):
    result = {
        "status": "success",
        "message": "Code executed successfully",
        "explanation": "Great job! No errors found.",
        "optimized_code": code
    }

    try:
        exec(code)

    except Exception as e:
        error_message = str(e)
        traceback_info = traceback.format_exc()

        result = {
            "status": "error",
            "message": error_message,
            "traceback": traceback_info,
            "explanation": explain_error(error_message),
            "optimized_code": suggest_fix(code)
        }

    return result


def explain_error(error):

    if "division by zero" in error.lower():
        return (
            "You are dividing a number by zero. "
            "Add a condition before division."
        )

    elif "syntax" in error.lower():
        return (
            "There is a syntax mistake in your code."
        )

    return "Unknown error occurred."


def suggest_fix(code):

    if "/0" in code:
        return code.replace("/0", "/1")

    return code
