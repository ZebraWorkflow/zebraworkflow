const historyStack = [];

function goToStep(stepId) {
    const steps = document.querySelectorAll('.step');
    const currentStep = document.querySelector('.step.active');

    if (currentStep) {
        currentStep.classList.remove('active');
        // Delay to allow transition out
        setTimeout(() => {
            currentStep.style.display = 'none';
        }, 300); // Match this duration with the transition duration in CSS

        // Push current step to the history stack
        if (currentStep.id !== stepId) {
            historyStack.push(currentStep.id);
        }
    }

    const nextStep = document.getElementById(stepId);
    if (nextStep) {
        nextStep.style.display = 'block';
        setTimeout(() => {
            nextStep.classList.add('active');
        }, 10); // Small delay to trigger the transition
    } else {
        console.error(`Element with ID '${stepId}' not found.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const workflow = document.getElementById('workflow');
    const topBackButton = document.getElementById('top-back-button');
    const previousPageButton = document.getElementById('previous-page-button'); // New button

    document.querySelectorAll('.workflow-button').forEach(button => {
        button.addEventListener('click', () => {
            // Hide all workflow steps
            document.querySelectorAll('.workflow-step').forEach(step => step.classList.add('hidden'));
            // Show the selected workflow step
            const workflowId = button.getAttribute('data-workflow');
            const workflowStep = document.getElementById(workflowId);
            if (workflowStep) {
                workflowStep.classList.remove('hidden');
            } else {
                console.error(`Element with ID '${workflowId}' not found.`);
            }
        });
    });

    if (topBackButton) {
        topBackButton.addEventListener('click', () => {
            const currentStep = document.querySelector('.step.active');
            if (currentStep && currentStep.id !== 'MainPage') {
                // Transition back to the main page
                goToStep('MainPage');
            } else {
                // If already on the main page, ensure it's displayed
                const mainPage = document.getElementById('MainPage');
                if (mainPage) {
                    mainPage.style.display = 'block';
                } else {
                    console.error("Element with ID 'MainPage' not found.");
                }
            }
        });
    } else {
        console.error("Element with ID 'top-back-button' not found.");
    }

    if (previousPageButton) {
        previousPageButton.addEventListener('click', () => {
            if (historyStack.length > 0) {
                const previousStepId = historyStack.pop();
                goToStep(previousStepId);
            } else {
                console.log("No previous step in the history");
            }
        });
    } else {
        console.error("Element with ID 'previous-page-button' not found.");
    }
});

function togglePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        if (popup.classList.contains('show')) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300); // Match the duration with the transition duration in CSS
        } else {
            popup.style.display = 'block';
            setTimeout(() => {
                popup.classList.add('show');
            }, 10); // Slight delay to trigger the transition
        }
    } else {
        console.error("Element with ID 'popup' not found.");
    }
}
