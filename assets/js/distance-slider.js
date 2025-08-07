$(document).ready(function() {
    let kmValue = 1; // Initial value
    const minKM = 1; // Minimum KM value
    const maxKM = 25; // Maximum KM value
    const step = 1; // Step for increment/decrement

    // Function to update the input value and highlight the corresponding box
    function updateKM() {
        $('#km-value').val(kmValue);
        // Remove 'active' class from all boxes
        $('.value-specs-box').removeClass('active');
        // Add 'active' class to the matching box based on the current kmValue
        $(`.value-specs-box span`).each(function() {
            if (parseInt($(this).text(), 10) === kmValue) {
                $(this).parent().addClass('active');
            }
        });
    }

    // Add button functionality
    $('#km-add').on('click', function() {
        if (kmValue + step <= maxKM) {
            kmValue += step;
            updateKM();
        }
    });

    // Subtract button functionality
    $('#km-subtract').on('click', function() {
        if (kmValue - step >= minKM) {
            kmValue -= step;
            updateKM();
        }
    });

    // Predefined value selection
    $('.value-specs-box').on('click', function() {
        kmValue = parseInt($(this).text(), 10);
        updateKM();
    });

    // Initial display
    updateKM();
});
