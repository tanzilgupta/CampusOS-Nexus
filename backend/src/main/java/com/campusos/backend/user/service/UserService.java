package com.campusos.backend.user.service;


import com.campusos.backend.config.JwtService;

import com.campusos.backend.profile.entity.StudentProfile;
import com.campusos.backend.profile.repository.ProfileRepository;

import com.campusos.backend.user.dto.*;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;


import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;



@Service
public class UserService {



    private final UserRepository userRepository;

    private final ProfileRepository profileRepository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;




    public UserService(
            UserRepository userRepository,
            ProfileRepository profileRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ){

        this.userRepository = userRepository;

        this.profileRepository = profileRepository;

        this.jwtService = jwtService;

        this.passwordEncoder = passwordEncoder;

    }





    public RegisterResponse registerUser(
            RegisterRequest request
    ){



        if(userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {


            throw new RuntimeException(
                    "Email already registered"
            );

        }





        User user = User.builder()

                .name(request.getName())

                .email(request.getEmail())

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(request.getRole())

                .build();





        User saved =
                userRepository.save(user);



        StudentProfile profile =
                StudentProfile.builder()

                        .user(saved)

                        .fullName(saved.getName())

                        .build();



        profileRepository.save(profile);





        return new RegisterResponse(

                saved.getId(),

                saved.getName(),

                saved.getEmail(),

                saved.getRole()

        );


    }









    public LoginResponse loginUser(
            LoginRequest request
    ){


        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );





        if(!passwordEncoder.matches(

                request.getPassword(),

                user.getPassword()

        )){


            throw new RuntimeException(
                    "Invalid password"
            );

        }





        String token =
                jwtService.generateToken(
                        user.getEmail()
                );





        return new LoginResponse(

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getRole(),

                token

        );

    }



}