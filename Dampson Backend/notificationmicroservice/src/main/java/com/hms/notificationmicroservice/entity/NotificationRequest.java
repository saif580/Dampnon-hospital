package com.hms.notificationmicroservice.entity;

public class NotificationRequest {
    private String appointmentId;
    private String patientId;
    private String email;
    private String subject;
    private String message;
    private String status;
    private String notificationType;

    // Constructor, Getters and Setters
    public NotificationRequest(String appointmentId, String patientId, String email, String subject, String message, String status, String notificationType) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.notificationType = notificationType;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }
}