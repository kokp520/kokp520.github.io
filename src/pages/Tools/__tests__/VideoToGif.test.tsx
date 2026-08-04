import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { VideoToGif } from '../VideoToGif';

const renderComponent = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <VideoToGif />
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('VideoToGif Component Integration & UI Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial upload screen correctly', () => {
    renderComponent();
    expect(screen.getByText(/VIDEO TO GIF CROPPER/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop video file here, or click to browse/i)).toBeInTheDocument();
  });

  it('loads video file and initializes default trim timeline from start (0s) to full video duration', async () => {
    renderComponent();

    const file = new File(['mock video content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Video display area should show PREVIEW & CROP AREA
    expect(await screen.findByText(/PREVIEW & CROP AREA/i)).toBeInTheDocument();

    const videoElement = document.querySelector('video') as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();

    // Mock video duration and loaded metadata
    Object.defineProperty(videoElement, 'duration', { value: 10, configurable: true });
    Object.defineProperty(videoElement, 'videoWidth', { value: 1280, configurable: true });
    Object.defineProperty(videoElement, 'videoHeight', { value: 720, configurable: true });
    Object.defineProperty(videoElement, 'getBoundingClientRect', {
      value: () => ({ width: 600, height: 337.5, top: 0, left: 0, right: 600, bottom: 337.5 }),
      configurable: true,
    });

    fireEvent.loadedMetadata(videoElement);

    // Verify default range starts at 0s and ends at full duration (10s)
    await waitFor(() => {
      expect(screen.getByText(/0.0s - 10.0s/i)).toBeInTheDocument();
      expect(screen.getByText(/TOTAL: 10.0s/i)).toBeInTheDocument();
    });
  });

  it('updates currentTime and seeks video when dragging green start timeline handle', async () => {
    renderComponent();

    const file = new File(['mock video content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    const videoElement = (await screen.findByText(/PREVIEW & CROP AREA/i)).parentElement?.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(videoElement, 'duration', { value: 20, configurable: true });
    fireEvent.loadedMetadata(videoElement);

    // Find start range slider input (title="Drag Start Marker...")
    const startHandle = screen.getByTitle(/Drag Start Marker/i) as HTMLInputElement;

    // Simulate drag start handle to 5.0 seconds
    fireEvent.input(startHandle, { target: { value: '5.0' } });
    fireEvent.change(startHandle, { target: { value: '5.0' } });

    await waitFor(() => {
      expect(videoElement.currentTime).toBe(5.0);
      expect(screen.getByText(/5.0s - 20.0s/i)).toBeInTheDocument();
    });
  });

  it('starts play from start handle position (startTime) when PLAY button is clicked', async () => {
    renderComponent();

    const file = new File(['mock video content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    const videoElement = (await screen.findByText(/PREVIEW & CROP AREA/i)).parentElement?.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(videoElement, 'duration', { value: 15, configurable: true });
    fireEvent.loadedMetadata(videoElement);

    // Move start marker to 3.0s
    const startHandle = screen.getByTitle(/Drag Start Marker/i) as HTMLInputElement;
    fireEvent.input(startHandle, { target: { value: '3.0' } });

    // Click PLAY button
    const playButton = screen.getByRole('button', { name: /PLAY \/ PAUSE/i });
    fireEvent.click(playButton);

    expect(videoElement.currentTime).toBe(3.0);
    expect(videoElement.play).toHaveBeenCalled();
  });
});
