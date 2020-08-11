(function(){if(!window.$mcSite){$mcSite={};$mcSite.attribution={settings:{url:"\/\/forever-aloevera.us18.list-manage.com\/track\/engagement",uid:"6bc7d7e42847ec4fe253d5a87"}};$mcSite.facebookPixel={settings:{pixelId:"612443549380966",enabled:"1",pixelIds:"[\"612443549380966\"]"}};$mcSite.google_analytics={settings:{enabled:"",tracking_id:""}};$mcSite.adwords_remarketing={settings:{google_allow_ad_personalization_signals:"true"}};}})();
/** This file contains code that will record an engagement with a Mailchimp campaign. */
(function () {
    var attribution = {
        checkForEngagement: function (url, uid) {
            if (this.doNotTrackEnabled()) {
                return;
            }

            var utmCampaign = this.getQueryParam("utm_campaign");
            var utmSource = this.getQueryParam("utm_source");
            var utmMedium = this.getQueryParam("utm_medium");

            if (this.isValidCampaign(utmCampaign) && this.isValidSource(utmSource) && this.isValidMedium(utmMedium)) {
                this.postEngagement(url, uid);
            }
        },

        getQueryParam: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        doNotTrackEnabled: function () {
            // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
            if (navigator.doNotTrack === "1" || navigator.msDoNotTrack === "1"
                || window.doNotTrack === "1" || navigator.doNotTrack === "yes") {
                return true;
            }

            return false;
        },

        isValidCampaign: function (campaign) {
            if (!campaign) {
                return false;
            }

            var regex = new RegExp("^[a-zA-Z0-9]{10,12}$"); // unique_id for campaigns is 10, ads is 12
            return campaign.search(regex) !== -1;
        },

        isValidSource: function (utmSourceParam) {
            if (!utmSourceParam) {
                return false;
            }

            var regex = new RegExp("^mailchimp$", "i");
            return utmSourceParam.search(regex) !== -1;
        },

        isValidMedium: function (utmMediumParam) {
            if (!utmMediumParam) {
                return false;
            }

            var regex = new RegExp("^(campaign|email|page|ad)$", "i");
            return utmMediumParam.search(regex) !== -1;
        },

        createCookie: function (name, value, expirationDays) {
            var cookie_value = encodeURIComponent(value) + ";";

            // set expiration
            if (expirationDays !== null) {
                var expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + expirationDays);
                cookie_value += " expires=" + expirationDate.toUTCString() + ";";
            }

            cookie_value += "path=/";
            document.cookie = name + "=" + cookie_value;
        },

        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return null;
        },

        postEngagement: function (url, uid) {
            var customer_session_id = this.readCookie("mc_customer_session_id");
            var data = {
                landing_site: window.location.href,
                u: uid,
                customer_session_id: customer_session_id
            };

            var XHR = new XMLHttpRequest();
            var urlEncodedDataPairs = [];

            var key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key] ? data[key] : "";
                    urlEncodedDataPairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
                }
            }

            var self = this;
            var urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+"); // replace spaces with '+'
            XHR.onreadystatechange = function () {
                if (XHR.readyState === XMLHttpRequest.DONE) {
                    var response = JSON.parse(XHR.responseText);
                    self.createCookie("mc_customer_session_id", response.customer_session_id, 30);
                }
            };

            // Set up our request
            XHR.open("POST", url, true);
            XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XHR.send(urlEncodedData);
        }
    };

    if (window.$mcSite === undefined || window.$mcSite.attribution === undefined) {
        return;
    }

    var module = window.$mcSite.attribution;
    if (module.installed === true) {
        return;
    }

    attribution.checkForEngagement(module.settings.url, module.settings.uid);
    module.installed = true;
}());
/* eslint-disable */
(function () {
    if (!window.$mcSite.facebookPixel.settings || !!$mcSite.facebookPixel.installed || !window.$mcSite.facebookPixel.settings.enabled) {
        return;
    }

    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','//connect.facebook.net/en_US/fbevents.js');

    var pixelIds = JSON.parse($mcSite.facebookPixel.settings.pixelIds || "[]");
    if (pixelIds.length) {
        pixelIds.forEach(function (id) {
            fbq('init', id);
        });

        fbq('track', 'PageView');
    }

    $mcSite.facebookPixel.installed = true;
})();
/* eslint-disable */
(function () {
    var doNotTrackEnabled = navigator.doNotTrack === "1"
        || navigator.msDoNotTrack === "1"
        || window.doNotTrack === "1"
        || navigator.doNotTrack === "yes";
    if (doNotTrackEnabled) {
        return;
    }

    if (window.$mcSite === undefined || window.$mcSite.google_analytics === undefined) {
        return;
    }

    var module = window.$mcSite.google_analytics;
    var moduleNotInstallable = module.installed === true
        || module.settings === undefined
        || module.settings.enabled !== "1"
        || !module.settings.tracking_id;
    if (moduleNotInstallable) {
        return;
    }

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', module.settings.tracking_id, 'auto');
    ga('send', 'pageview');
    module.installed = true;
}());
/* eslint-disable */
(function () {
    if (window.$mcSite === undefined || window.$mcSite.adwords_remarketing === undefined) {
        return;
    }

    var module = window.$mcSite.adwords_remarketing;

    if(module.installed === true) {
        return;
    }

    if (!module.settings) {
        return;
    }

    var settings = module.settings;

    if(!settings.google_conversion_id) {
        return;
    }

    if(!settings.google_remarketing_only) {
        return;
    }

    var script = document.createElement("script");
    script.src = "//www.googleadservices.com/pagead/conversion_async.js";
    script.type = "text/javascript";
    script.onload = function () {
        var allow_personalization_settings = settings.google_allow_ad_personalization_signals;
        if (allow_personalization_settings === undefined) {
            allow_personalization_settings = "true";
        }

        window.google_trackConversion({
            google_conversion_id: settings.google_conversion_id,
            google_remarketing_only: settings.google_remarketing_only,
            google_allow_ad_personalization_signals: allow_personalization_settings
        });
    };

    document.body.appendChild(script);

    window.$mcSite.adwords_remarketing.installed = true;
})();
