/**
 * @see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
 */

import { Component, ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** The error message to display to the user */
  message: String;
  /** `true` if the children are federated modules */
  remote?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.remote) {
      console.error('Uncaught error, possibly in remote code:', errorInfo);
    } else {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return <h1>{this.props.message}</h1>;
    }

    return this.props.children;
  }
}