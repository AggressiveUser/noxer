
setTimeout(function() {
	Java.perform(function() {
		console.log('');
		console.log('=================================================================');
		console.log('[#]  Android Bypass for various Certificate Pinning methods   [#]');
		console.log('=================================================================');


		var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
		var SSLContext = Java.use('javax.net.ssl.SSLContext');
		
		// TrustManager (Android < 7) //
		////////////////////////////////
		var TrustManager = Java.registerClass({
			// Implement a custom TrustManager
			name: 'dev.asd.test.TrustManager',
			implements: [X509TrustManager],
			methods: {
				checkClientTrusted: function(chain, authType) {},
				checkServerTrusted: function(chain, authType) {},
				getAcceptedIssuers: function() {return []; }
			}
		});
		// Prepare the TrustManager array to pass to SSLContext.init()
		var TrustManagers = [TrustManager.$new()];
		// Get a handle on the init() on the SSLContext class
		var SSLContext_init = SSLContext.init.overload(
			'[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom');
		try {
			// Override the init method, specifying the custom TrustManager
			SSLContext_init.implementation = function(keyManager, trustManager, secureRandom) {
				console.log('[+] Bypassing Trustmanager (Android < 7) pinner');
				SSLContext_init.call(this, keyManager, TrustManagers, secureRandom);
			};
		} catch (err) {
			console.log('[-] TrustManager (Android < 7) pinner not found');
			//console.log(err);
		}



	
		// OkHTTPv3 (quadruple bypass) //
		/////////////////////////////////
		try {
			// Bypass OkHTTPv3 {1}
			var okhttp3_Activity_1 = Java.use('okhttp3.CertificatePinner');    
			okhttp3_Activity_1.check.overload('java.lang.String', 'java.util.List').implementation = function(a, b) {                              
				console.log('[+] Bypassing OkHTTPv3 {1}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] OkHTTPv3 {1} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass OkHTTPv3 {2}
			// This method of CertificatePinner.check is deprecated but could be found in some old Android apps
			var okhttp3_Activity_2 = Java.use('okhttp3.CertificatePinner');    
			okhttp3_Activity_2.check.overload('java.lang.String', 'java.security.cert.Certificate').implementation = function(a, b) {
				console.log('[+] Bypassing OkHTTPv3 {2}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] OkHTTPv3 {2} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass OkHTTPv3 {3}
			var okhttp3_Activity_3 = Java.use('okhttp3.CertificatePinner');    
			okhttp3_Activity_3.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function(a, b) {
				console.log('[+] Bypassing OkHTTPv3 {3}: ' + a);
				return;
			};
		} catch(err) {
			console.log('[-] OkHTTPv3 {3} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass OkHTTPv3 {4}
			var okhttp3_Activity_4 = Java.use('okhttp3.CertificatePinner');    
			//okhttp3_Activity_4['check$okhttp'].implementation = function(a, b) {
			okhttp3_Activity_4.check$okhttp.overload('java.lang.String', 'kotlin.jvm.functions.Function0').implementation = function(a, b) {		
				console.log('[+] Bypassing OkHTTPv3 {4}: ' + a);
				return;
			};
		} catch(err) {
			console.log('[-] OkHTTPv3 {4} pinner not found');
			//console.log(err);
		}

	

	
		// Trustkit (triple bypass) //
		//////////////////////////////
		try {
			// Bypass Trustkit {1}
			var trustkit_Activity_1 = Java.use('com.datatheorem.android.trustkit.pinning.OkHostnameVerifier');
			trustkit_Activity_1.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function(a, b) {
				console.log('[+] Bypassing Trustkit {1}: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Trustkit {1} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass Trustkit {2}
			var trustkit_Activity_2 = Java.use('com.datatheorem.android.trustkit.pinning.OkHostnameVerifier');
			trustkit_Activity_2.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function(a, b) {
				console.log('[+] Bypassing Trustkit {2}: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Trustkit {2} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass Trustkit {3}
			var trustkit_PinningTrustManager = Java.use('com.datatheorem.android.trustkit.pinning.PinningTrustManager');
			trustkit_PinningTrustManager.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String').implementation = function(chain, authType) {
				console.log('[+] Bypassing Trustkit {3}');
				//return;
			};
		} catch (err) {
			console.log('[-] Trustkit {3} pinner not found');
			//console.log(err);
		}
		
	
	
  
		// TrustManagerImpl (Android > 7) //
		////////////////////////////////////
		try {
			// Bypass TrustManagerImpl (Android > 7) {1}
			var array_list = Java.use("java.util.ArrayList");
			var TrustManagerImpl_Activity_1 = Java.use('com.android.org.conscrypt.TrustManagerImpl');
			TrustManagerImpl_Activity_1.checkTrustedRecursive.implementation = function(certs, ocspData, tlsSctData, host, clientAuth, untrustedChain, trustAnchorChain, used) {
				console.log('[+] Bypassing TrustManagerImpl (Android > 7) checkTrustedRecursive check: '+ host);
				return array_list.$new();
			};
		} catch (err) {
			console.log('[-] TrustManagerImpl (Android > 7) checkTrustedRecursive check not found');
			//console.log(err);
		}  
		try {
			// Bypass TrustManagerImpl (Android > 7) {2} (probably no more necessary)
			var TrustManagerImpl_Activity_2 = Java.use('com.android.org.conscrypt.TrustManagerImpl');
			TrustManagerImpl_Activity_2.verifyChain.implementation = function(untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
				console.log('[+] Bypassing TrustManagerImpl (Android > 7) verifyChain check: ' + host);
				return untrustedChain;
			};   
		} catch (err) {
			console.log('[-] TrustManagerImpl (Android > 7) verifyChain check not found');
			//console.log(err);
		}

  
  
		

		// Appcelerator Titanium PinningTrustManager //
		///////////////////////////////////////////////
		try {
			var appcelerator_PinningTrustManager = Java.use('appcelerator.https.PinningTrustManager');
			appcelerator_PinningTrustManager.checkServerTrusted.implementation = function(chain, authType) {
				console.log('[+] Bypassing Appcelerator PinningTrustManager');
				return;
			};
		} catch (err) {
			console.log('[-] Appcelerator PinningTrustManager pinner not found');
			//console.log(err);
		}




		// Fabric PinningTrustManager //
		////////////////////////////////
		try {
			var fabric_PinningTrustManager = Java.use('io.fabric.sdk.android.services.network.PinningTrustManager');
			fabric_PinningTrustManager.checkServerTrusted.implementation = function(chain, authType) {
				console.log('[+] Bypassing Fabric PinningTrustManager');
				return;
			};
		} catch (err) {
			console.log('[-] Fabric PinningTrustManager pinner not found');
			//console.log(err);
		}




		// OpenSSLSocketImpl Conscrypt (double bypass) //
		/////////////////////////////////////////////////
		try {
			var OpenSSLSocketImpl = Java.use('com.android.org.conscrypt.OpenSSLSocketImpl');
			OpenSSLSocketImpl.verifyCertificateChain.implementation = function(certRefs, JavaObject, authMethod) {
				console.log('[+] Bypassing OpenSSLSocketImpl Conscrypt {1}');
			};
		} catch (err) {
			console.log('[-] OpenSSLSocketImpl Conscrypt {1} pinner not found');
			//console.log(err);        
		}
		try {
			var OpenSSLSocketImpl = Java.use('com.android.org.conscrypt.OpenSSLSocketImpl');
			OpenSSLSocketImpl.verifyCertificateChain.implementation = function(certChain, authMethod) {
				console.log('[+] Bypassing OpenSSLSocketImpl Conscrypt {2}');
			};
		} catch (err) {
			console.log('[-] OpenSSLSocketImpl Conscrypt {2} pinner not found');
			//console.log(err);        
		}




		// OpenSSLEngineSocketImpl Conscrypt //
		///////////////////////////////////////
		try {
			var OpenSSLEngineSocketImpl_Activity = Java.use('com.android.org.conscrypt.OpenSSLEngineSocketImpl');
			OpenSSLEngineSocketImpl_Activity.verifyCertificateChain.overload('[Ljava.lang.Long;', 'java.lang.String').implementation = function(a, b) {
				console.log('[+] Bypassing OpenSSLEngineSocketImpl Conscrypt: ' + b);
			};
		} catch (err) {
			console.log('[-] OpenSSLEngineSocketImpl Conscrypt pinner not found');
			//console.log(err);
		}




		// OpenSSLSocketImpl Apache Harmony //
		//////////////////////////////////////
		try {
			var OpenSSLSocketImpl_Harmony = Java.use('org.apache.harmony.xnet.provider.jsse.OpenSSLSocketImpl');
			OpenSSLSocketImpl_Harmony.verifyCertificateChain.implementation = function(asn1DerEncodedCertificateChain, authMethod) {
				console.log('[+] Bypassing OpenSSLSocketImpl Apache Harmony');
			};
		} catch (err) {
			console.log('[-] OpenSSLSocketImpl Apache Harmony pinner not found');
			//console.log(err);      
		}




		// PhoneGap sslCertificateChecker //
		////////////////////////////////////
		try {
			var phonegap_Activity = Java.use('nl.xservices.plugins.sslCertificateChecker');
			phonegap_Activity.execute.overload('java.lang.String', 'org.json.JSONArray', 'org.apache.cordova.CallbackContext').implementation = function(a, b, c) {
				console.log('[+] Bypassing PhoneGap sslCertificateChecker: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] PhoneGap sslCertificateChecker pinner not found');
			//console.log(err);
		}




		// IBM MobileFirst pinTrustedCertificatePublicKey (double bypass) //
		////////////////////////////////////////////////////////////////////
		try {
			// Bypass IBM MobileFirst {1}
			var WLClient_Activity_1 = Java.use('com.worklight.wlclient.api.WLClient');
			WLClient_Activity_1.getInstance().pinTrustedCertificatePublicKey.overload('java.lang.String').implementation = function(cert) {
				console.log('[+] Bypassing IBM MobileFirst pinTrustedCertificatePublicKey {1}: ' + cert);
				return;
			};
			} catch (err) {
			console.log('[-] IBM MobileFirst pinTrustedCertificatePublicKey {1} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass IBM MobileFirst {2}
			var WLClient_Activity_2 = Java.use('com.worklight.wlclient.api.WLClient');
			WLClient_Activity_2.getInstance().pinTrustedCertificatePublicKey.overload('[Ljava.lang.String;').implementation = function(cert) {
				console.log('[+] Bypassing IBM MobileFirst pinTrustedCertificatePublicKey {2}: ' + cert);
				return;
			};
		} catch (err) {
			console.log('[-] IBM MobileFirst pinTrustedCertificatePublicKey {2} pinner not found');
			//console.log(err);
		}




		// IBM WorkLight (ancestor of MobileFirst) HostNameVerifierWithCertificatePinning (quadruple bypass) //
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		try {
			// Bypass IBM WorkLight {1}
			var worklight_Activity_1 = Java.use('com.worklight.wlclient.certificatepinning.HostNameVerifierWithCertificatePinning');
			worklight_Activity_1.verify.overload('java.lang.String', 'javax.net.ssl.SSLSocket').implementation = function(a, b) {
				console.log('[+] Bypassing IBM WorkLight HostNameVerifierWithCertificatePinning {1}: ' + a);                
				return;
			};
		} catch (err) {
			console.log('[-] IBM WorkLight HostNameVerifierWithCertificatePinning {1} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass IBM WorkLight {2}
			var worklight_Activity_2 = Java.use('com.worklight.wlclient.certificatepinning.HostNameVerifierWithCertificatePinning');
			worklight_Activity_2.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function(a, b) {
				console.log('[+] Bypassing IBM WorkLight HostNameVerifierWithCertificatePinning {2}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] IBM WorkLight HostNameVerifierWithCertificatePinning {2} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass IBM WorkLight {3}
			var worklight_Activity_3 = Java.use('com.worklight.wlclient.certificatepinning.HostNameVerifierWithCertificatePinning');
			worklight_Activity_3.verify.overload('java.lang.String', '[Ljava.lang.String;', '[Ljava.lang.String;').implementation = function(a, b) {
				console.log('[+] Bypassing IBM WorkLight HostNameVerifierWithCertificatePinning {3}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] IBM WorkLight HostNameVerifierWithCertificatePinning {3} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass IBM WorkLight {4}
			var worklight_Activity_4 = Java.use('com.worklight.wlclient.certificatepinning.HostNameVerifierWithCertificatePinning');
			worklight_Activity_4.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function(a, b) {
				console.log('[+] Bypassing IBM WorkLight HostNameVerifierWithCertificatePinning {4}: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] IBM WorkLight HostNameVerifierWithCertificatePinning {4} pinner not found');
			//console.log(err);
		}




		// Conscrypt CertPinManager //
		//////////////////////////////
		try {
			var conscrypt_CertPinManager_Activity = Java.use('com.android.org.conscrypt.CertPinManager');
			conscrypt_CertPinManager_Activity.checkChainPinning.overload('java.lang.String', 'java.util.List').implementation = function(a, b) {
				console.log('[+] Bypassing Conscrypt CertPinManager: ' + a);
				//return;
				return true;
			};
		} catch (err) {
			console.log('[-] Conscrypt CertPinManager pinner not found');
			//console.log(err);
		}
		
		


		// Conscrypt CertPinManager (Legacy) //
		///////////////////////////////////////
		try {
			var legacy_conscrypt_CertPinManager_Activity = Java.use('com.android.org.conscrypt.CertPinManager');
			legacy_conscrypt_CertPinManager_Activity.isChainValid.overload('java.lang.String', 'java.util.List').implementation = function(a, b) {
				console.log('[+] Bypassing Conscrypt CertPinManager (Legacy): ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Conscrypt CertPinManager (Legacy) pinner not found');
			//console.log(err);
		}

			   


		// CWAC-Netsecurity (unofficial back-port pinner for Android<4.2) CertPinManager //
		///////////////////////////////////////////////////////////////////////////////////
		try {
			var cwac_CertPinManager_Activity = Java.use('com.commonsware.cwac.netsecurity.conscrypt.CertPinManager');
			cwac_CertPinManager_Activity.isChainValid.overload('java.lang.String', 'java.util.List').implementation = function(a, b) {
				console.log('[+] Bypassing CWAC-Netsecurity CertPinManager: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] CWAC-Netsecurity CertPinManager pinner not found');
			//console.log(err);
		}




		// Worklight Androidgap WLCertificatePinningPlugin //
		/////////////////////////////////////////////////////
		try {
			var androidgap_WLCertificatePinningPlugin_Activity = Java.use('com.worklight.androidgap.plugin.WLCertificatePinningPlugin');
			androidgap_WLCertificatePinningPlugin_Activity.execute.overload('java.lang.String', 'org.json.JSONArray', 'org.apache.cordova.CallbackContext').implementation = function(a, b, c) {
				console.log('[+] Bypassing Worklight Androidgap WLCertificatePinningPlugin: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Worklight Androidgap WLCertificatePinningPlugin pinner not found');
			//console.log(err);
		}




		// Netty FingerprintTrustManagerFactory //
		//////////////////////////////////////////
		try {
			var netty_FingerprintTrustManagerFactory = Java.use('io.netty.handler.ssl.util.FingerprintTrustManagerFactory');
			//NOTE: sometimes this below implementation could be useful 
			//var netty_FingerprintTrustManagerFactory = Java.use('org.jboss.netty.handler.ssl.util.FingerprintTrustManagerFactory');
			netty_FingerprintTrustManagerFactory.checkTrusted.implementation = function(type, chain) {
				console.log('[+] Bypassing Netty FingerprintTrustManagerFactory');
			};
		} catch (err) {
			console.log('[-] Netty FingerprintTrustManagerFactory pinner not found');
			//console.log(err);
		}




		// Squareup CertificatePinner [OkHTTP<v3] (double bypass) //
		////////////////////////////////////////////////////////////
		try {
			// Bypass Squareup CertificatePinner  {1}
			var Squareup_CertificatePinner_Activity_1 = Java.use('com.squareup.okhttp.CertificatePinner');
			Squareup_CertificatePinner_Activity_1.check.overload('java.lang.String', 'java.security.cert.Certificate').implementation = function(a, b) {
				console.log('[+] Bypassing Squareup CertificatePinner {1}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] Squareup CertificatePinner {1} pinner not found');
			//console.log(err);
		}
		try {
			// Bypass Squareup CertificatePinner {2}
			var Squareup_CertificatePinner_Activity_2 = Java.use('com.squareup.okhttp.CertificatePinner');
			Squareup_CertificatePinner_Activity_2.check.overload('java.lang.String', 'java.util.List').implementation = function(a, b) {
				console.log('[+] Bypassing Squareup CertificatePinner {2}: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] Squareup CertificatePinner {2} pinner not found');
			//console.log(err);
		}




		// Squareup OkHostnameVerifier [OkHTTP v3] (double bypass) //
		/////////////////////////////////////////////////////////////
		try {
			// Bypass Squareup OkHostnameVerifier {1}
			var Squareup_OkHostnameVerifier_Activity_1 = Java.use('com.squareup.okhttp.internal.tls.OkHostnameVerifier');
			Squareup_OkHostnameVerifier_Activity_1.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function(a, b) {
				console.log('[+] Bypassing Squareup OkHostnameVerifier {1}: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Squareup OkHostnameVerifier check not found');
			//console.log(err);
		}    
		try {
			// Bypass Squareup OkHostnameVerifier {2}
			var Squareup_OkHostnameVerifier_Activity_2 = Java.use('com.squareup.okhttp.internal.tls.OkHostnameVerifier');
			Squareup_OkHostnameVerifier_Activity_2.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function(a, b) {
				console.log('[+] Bypassing Squareup OkHostnameVerifier {2}: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Squareup OkHostnameVerifier check not found');
			//console.log(err);
		}


		

		// Android WebViewClient (quadruple bypass) //
		//////////////////////////////////////////////
		try {
			// Bypass WebViewClient {1} (deprecated from Android 6)
			var AndroidWebViewClient_Activity_1 = Java.use('android.webkit.WebViewClient');
			AndroidWebViewClient_Activity_1.onReceivedSslError.overload('android.webkit.WebView', 'android.webkit.SslErrorHandler', 'android.net.http.SslError').implementation = function(obj1, obj2, obj3) {
				console.log('[+] Bypassing Android WebViewClient check {1}');
			};
		} catch (err) {
			console.log('[-] Android WebViewClient {1} check not found');
			//console.log(err)
		}
		try {
			// Bypass WebViewClient {2}
			var AndroidWebViewClient_Activity_2 = Java.use('android.webkit.WebViewClient');
			AndroidWebViewClient_Activity_2.onReceivedSslError.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError').implementation = function(obj1, obj2, obj3) {
				console.log('[+] Bypassing Android WebViewClient check {2}');
			};
		} catch (err) {
			console.log('[-] Android WebViewClient {2} check not found');
			//console.log(err)
		}
		try {
			// Bypass WebViewClient {3}
			var AndroidWebViewClient_Activity_3 = Java.use('android.webkit.WebViewClient');
			AndroidWebViewClient_Activity_3.onReceivedError.overload('android.webkit.WebView', 'int', 'java.lang.String', 'java.lang.String').implementation = function(obj1, obj2, obj3, obj4) {
				console.log('[+] Bypassing Android WebViewClient check {3}');
			};
		} catch (err) {
			console.log('[-] Android WebViewClient {3} check not found');
			//console.log(err)
		}
		try {
			// Bypass WebViewClient {4}
			var AndroidWebViewClient_Activity_4 = Java.use('android.webkit.WebViewClient');
			AndroidWebViewClient_Activity_4.onReceivedError.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError').implementation = function(obj1, obj2, obj3) {
				console.log('[+] Bypassing Android WebViewClient check {4}');
			};
		} catch (err) {
			console.log('[-] Android WebViewClient {4} check not found');
			//console.log(err)
		}
		



		// Apache Cordova WebViewClient //
		//////////////////////////////////
		try {
			var CordovaWebViewClient_Activity = Java.use('org.apache.cordova.CordovaWebViewClient');
			CordovaWebViewClient_Activity.onReceivedSslError.overload('android.webkit.WebView', 'android.webkit.SslErrorHandler', 'android.net.http.SslError').implementation = function(obj1, obj2, obj3) {
				console.log('[+] Bypassing Apache Cordova WebViewClient check');
				obj3.proceed();
			};
		} catch (err) {
			console.log('[-] Apache Cordova WebViewClient check not found');
			//console.log(err);
		}




		// Boye AbstractVerifier //
		///////////////////////////
		try {
			var boye_AbstractVerifier = Java.use('ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier');
			boye_AbstractVerifier.verify.implementation = function(host, ssl) {
				console.log('[+] Bypassing Boye AbstractVerifier check: ' + host);
			};
		} catch (err) {
			console.log('[-] Boye AbstractVerifier check not found');
			//console.log(err);
		}




		// Apache AbstractVerifier //
		/////////////////////////////
		try {
			var apache_AbstractVerifier = Java.use('org.apache.http.conn.ssl.AbstractVerifier');
			apache_AbstractVerifier.verify.implementation = function(a, b, c, d) {
				console.log('[+] Bypassing Apache AbstractVerifier check: ' + a);
				return;
			};
		} catch (err) {
			console.log('[-] Apache AbstractVerifier check not found');
			//console.log(err);
		}




		// Chromium Cronet //
		/////////////////////    
		try {
			var CronetEngineBuilderImpl_Activity = Java.use("org.chromium.net.impl.CronetEngineBuilderImpl");
			// Setting argument to TRUE (default is TRUE) to disable Public Key pinning for local trust anchors
			CronetEngine_Activity.enablePublicKeyPinningBypassForLocalTrustAnchors.overload('boolean').implementation = function(a) {
				console.log("[+] Disabling Public Key pinning for local trust anchors in Chromium Cronet");
				var cronet_obj_1 = CronetEngine_Activity.enablePublicKeyPinningBypassForLocalTrustAnchors.call(this, true);
				return cronet_obj_1;
			};
			// Bypassing Chromium Cronet pinner
			CronetEngine_Activity.addPublicKeyPins.overload('java.lang.String', 'java.util.Set', 'boolean', 'java.util.Date').implementation = function(hostName, pinsSha256, includeSubdomains, expirationDate) {
				console.log("[+] Bypassing Chromium Cronet pinner: " + hostName);
				var cronet_obj_2 = CronetEngine_Activity.addPublicKeyPins.call(this, hostName, pinsSha256, includeSubdomains, expirationDate);
				return cronet_obj_2;
			};
		} catch (err) {
			console.log('[-] Chromium Cronet pinner not found')
			//console.log(err);
		}



		// Flutter Pinning packages http_certificate_pinning and ssl_pinning_plugin (double bypass) //
		//////////////////////////////////////////////////////////////////////////////////////////////
		try {
			// Bypass HttpCertificatePinning.check {1}
			var HttpCertificatePinning_Activity = Java.use('diefferson.http_certificate_pinning.HttpCertificatePinning');
			HttpCertificatePinning_Activity.checkConnexion.overload("java.lang.String", "java.util.List", "java.util.Map", "int", "java.lang.String").implementation = function (a, b, c ,d, e) {
				console.log('[+] Bypassing Flutter HttpCertificatePinning : ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Flutter HttpCertificatePinning pinner not found');
			//console.log(err);
		}
		try {
			// Bypass SslPinningPlugin.check {2}
			var SslPinningPlugin_Activity = Java.use('com.macif.plugin.sslpinningplugin.SslPinningPlugin');
			SslPinningPlugin_Activity.checkConnexion.overload("java.lang.String", "java.util.List", "java.util.Map", "int", "java.lang.String").implementation = function (a, b, c ,d, e) {
				console.log('[+] Bypassing Flutter SslPinningPlugin: ' + a);
				return true;
			};
		} catch (err) {
			console.log('[-] Flutter SslPinningPlugin pinner not found');
			//console.log(err);
		}



		
		// Dynamic SSLPeerUnverifiedException Patcher                                //
		// An useful technique to bypass SSLPeerUnverifiedException failures raising //
		// when the Android app uses some uncommon SSL Pinning methods or an heavily //
		// code obfuscation. Inspired by an idea of: https://github.com/httptoolkit  //
		///////////////////////////////////////////////////////////////////////////////
		function rudimentaryFix(typeName) {
			// This is a improvable rudimentary fix, if not works you can patch it manually
			if (typeName === undefined){
				return;
			} else if (typeName === 'boolean') {
				return true;
			} else {
				return null;
			}
		}
		try {
			var UnverifiedCertError = Java.use('javax.net.ssl.SSLPeerUnverifiedException');
			UnverifiedCertError.$init.implementation = function (str) {
				console.log('\x1b[36m[!] Unexpected SSLPeerUnverifiedException occurred, trying to patch it dynamically...\x1b[0m');
				try {
					var stackTrace = Java.use('java.lang.Thread').currentThread().getStackTrace();
					var exceptionStackIndex = stackTrace.findIndex(stack =>
						stack.getClassName() === "javax.net.ssl.SSLPeerUnverifiedException"
					);
					// Retrieve the method raising the SSLPeerUnverifiedException
					var callingFunctionStack = stackTrace[exceptionStackIndex + 1];
					var className = callingFunctionStack.getClassName();
					var methodName = callingFunctionStack.getMethodName();
					var callingClass = Java.use(className);
					var callingMethod = callingClass[methodName];
					console.log('\x1b[36m[!] Attempting to bypass uncommon SSL Pinning method on: '+className+'.'+methodName+'\x1b[0m');					
					// Skip it when already patched by Frida
					if (callingMethod.implementation) {
						return; 
					}
					// Trying to patch the uncommon SSL Pinning method via implementation
					var returnTypeName = callingMethod.returnType.type;
					callingMethod.implementation = function() {
						rudimentaryFix(returnTypeName);
					};
				} catch (e) {
					// Dynamic patching via implementation does not works, then trying via function overloading
					//console.log('[!] The uncommon SSL Pinning method has more than one overload); 
					if (String(e).includes(".overload")) {
						var splittedList = String(e).split(".overload");
						for (let i=2; i<splittedList.length; i++) {
							var extractedOverload = splittedList[i].trim().split("(")[1].slice(0,-1).replaceAll("'","");
							// Check if extractedOverload has multiple arguments
							if (extractedOverload.includes(",")) {
								// Go here if overloaded method has multiple arguments (NOTE: max 6 args are covered here)
								var argList = extractedOverload.split(", ");
								console.log('\x1b[36m[!] Attempting overload of '+className+'.'+methodName+' with arguments: '+extractedOverload+'\x1b[0m');
								if (argList.length == 2) {
									callingMethod.overload(argList[0], argList[1]).implementation = function(a,b) {
										rudimentaryFix(returnTypeName);
									}
								} else if (argNum == 3) {
									callingMethod.overload(argList[0], argList[1], argList[2]).implementation = function(a,b,c) {
										rudimentaryFix(returnTypeName);
									}
								}  else if (argNum == 4) {
									callingMethod.overload(argList[0], argList[1], argList[2], argList[3]).implementation = function(a,b,c,d) {
										rudimentaryFix(returnTypeName);
									}
								}  else if (argNum == 5) {
									callingMethod.overload(argList[0], argList[1], argList[2], argList[3], argList[4]).implementation = function(a,b,c,d,e) {
										rudimentaryFix(returnTypeName);
									}
								}  else if (argNum == 6) {
									callingMethod.overload(argList[0], argList[1], argList[2], argList[3], argList[4], argList[5]).implementation = function(a,b,c,d,e,f) {
										rudimentaryFix(returnTypeName);
									}
								} 
							// Go here if overloaded method has a single argument
							} else {
								callingMethod.overload(extractedOverload).implementation = function(a) {
									rudimentaryFix(returnTypeName);
								}
							}
						}
					} else {
						console.log('\x1b[36m[-] Failed to dynamically patch SSLPeerUnverifiedException '+e+'\x1b[0m');
					}
				}
				//console.log('\x1b[36m[+] SSLPeerUnverifiedException hooked\x1b[0m');
				return this.$init(str);
			};
		} catch (err) {
			//console.log('\x1b[36m[-] SSLPeerUnverifiedException not found\x1b[0m');
			//console.log('\x1b[36m'+err+'\x1b[0m');
		}
		
	console.log('=================================================================');
	console.log('[#]SSL Mujhe Ta Ta Kar Do :) Mujhe Ta Ta Kar Do - Deepak Kalal[#]');
	console.log('=================================================================');
	});
	
}, 0);