package com.kitch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StepRequest {

    @NotBlank
    @Size(max = 1000)
    private String instruction;

    public StepRequest() {}

    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }
}
