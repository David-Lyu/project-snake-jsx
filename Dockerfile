FROM nginx
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/src/client/dist /usr/share/nginx/html


# COPY /dist /user/share/nginx/html
# # Expose the port that the application listens on.
EXPOSE 8090
