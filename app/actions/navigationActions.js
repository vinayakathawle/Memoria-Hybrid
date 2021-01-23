/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService';

export function navigateToDashboard(params) {
  NavigationService.navigate('Dashboard', params);
}

export function navigateToForgotPassword(params) {
  NavigationService.navigate('ForgotPassword', params);
}

export function navigateToSignup(params) {
  NavigationService.navigate('Signup', params);
}

export function navigateToTermsCondition(params) {
  NavigationService.navigate('TermsCondition', params);
}

export function navigateToLegalPolicy(params) {
  NavigationService.navigate('LegalPolicy', params);
}

export function navigateToOption(params) {
  NavigationService.navigate('Option', params);
}
