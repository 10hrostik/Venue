package com.controllers;

import com.api.dto.BatchResponseDto;
import com.api.dto.place.PlaceDto;
import com.api.dto.place.PlaceResponseDto;
import com.api.services.room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/public/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping(value = "/place/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<PlaceResponseDto> getPlaces(@PathVariable(value = "id") Integer id) {
        BatchResponseDto<PlaceResponseDto> response = new BatchResponseDto<>();
        response.setData(roomService.getResponseDto(id));
        response.setMessage("Found " + response.getData().getPlaces().size());

        return response;
    }

}
