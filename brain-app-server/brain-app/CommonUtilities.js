var CommonUtilities = (function () {
    function CommonUtilities() {
    }
    CommonUtilities.isDiscreteValues = function (values, threshold) {
        if (!threshold)
            threshold = 10;
        var flags = [], distincts = [], l = values.length;
        for (var i = 0; i < l; i++) {
            if (flags[values[i]])
                continue;
            flags[values[i]] = true;
            distincts.push(values[i]);
            if (distincts.length > threshold) {
                return false;
            }
        }
        return true;
    };
    CommonUtilities.isSimatrical = function (matrix) {
        if (matrix.length !== matrix[0].length)
            return false;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = i + 1; j < matrix[0].length; j++) {
                if (matrix[i][j] !== matrix[j][i]) {
                    return false;
                }
            }
        }
        return true;
    };
    CommonUtilities.getDistinctValues = function (values) {
        var flags = [], distincts = [], l = values.length;
        for (var i = 0; i < l; i++) {
            if (flags[values[i]])
                continue;
            flags[values[i]] = true;
            distincts.push(values[i]);
        }
        return distincts;
    };
    CommonUtilities.matrixToArray = function (matrix, adjMatrix) {
        var array = [];
        if (adjMatrix) {
            var len = adjMatrix.length;
            for (var i = 0; i < len - 1; i++) {
                adjMatrix[i][i] = null;
                for (var j = i + 1; j < len; ++j) {
                    if (adjMatrix[i][j] === 1) {
                        array.push(matrix[i][j]);
                    }
                }
            }
            return array;
        }
        else {
            console.log("WARNING: MatrixToArray has not been implemented logic without adjMatrix!");
            return null;
        }
    };
    CommonUtilities.launchAlertMessage = function (alertType, alertMessage) {
        var alertID = "alert" + this.alertNumber;
        var alertIcon;
        var alertTypeString;
        this.alertNumber++;
        var alertTypeClass;
        if (alertType === this.alertType.SUCCESS) {
            alertTypeClass = "alert-success";
            alertIcon = "glyphicon-ok-sign";
            alertTypeString = "Success!";
        }
        else if (alertType === this.alertType.WARNING) {
            alertTypeClass = "alert-warning";
            alertIcon = "glyphicon-info-sign";
            alertTypeString = "Warning!";
        }
        else if (alertType === this.alertType.ERROR) {
            alertTypeClass = "alert-danger";
            alertIcon = "glyphicon-remove-sign";
            alertTypeString = "Error!";
        }
        var newAlert = $('<div id="' + alertID + '" class="alert ' + alertTypeClass + '" role="alert"></div>')
            .append($('<span class="glyphicon ' + alertIcon + '" aria-hidden="true"> ' + alertTypeString + '</span>'))
            .append('<p>' + alertMessage + '</p>');
        $("#divAlerts").append(newAlert);
        setTimeout(function () {
            newAlert['alert']('close');
        }, 5000);
    };
    CommonUtilities.hexToRgb = function (hex, alpha) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var toString = function () {
            if (this.alpha == undefined) {
                return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
            }
            if (this.alpha > 1) {
                this.alpha = 1;
            }
            else if (this.alpha < 0) {
                this.alpha = 0;
            }
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
        };
        if (alpha == undefined) {
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                toString: toString
            } : null;
        }
        if (alpha > 1) {
            alpha = 1;
        }
        else if (alpha < 0) {
            alpha = 0;
        }
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            alpha: alpha,
            toString: toString
        } : null;
    };
    CommonUtilities.concatTwoDimensionalArray = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray = newArray.concat(array[i]);
        }
        return newArray;
    };
    CommonUtilities.timeTracker = new Date().getMilliseconds();
    CommonUtilities.alertType = {
        "ERROR": 2,
        "SUCCESS": 0,
        "WARNING": 1
    };
    CommonUtilities.alertNumber = 0;
    return CommonUtilities;
}());