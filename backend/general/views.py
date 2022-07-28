from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

#  import models
from .models import MediaGallery

# import serializers
from .serializers import MediaGallerySerializer

# utils
from ecommerce.pagination import CustomPagination


class MediaGalleryView(APIView):
    serializer_class = MediaGallerySerializer
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        paginator = CustomPagination()
        queryset = MediaGallery.objects.all()
        data = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(
            data, many=True, context={'request': request})
        return Response(paginator.get_paginated_response(serializer.data).data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            files = request.FILES.getlist('file[]')
            file_list = list()
            for file in files:
                newFile = MediaGallery.objects.create(file=file)
                serializer = self.serializer_class(
                    newFile, context={'request': request})
                file_list.append(serializer.data)

            return Response(file_list, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Cannot upload file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            file = MediaGallery.objects.get(id=pk)
            file.file.file.close()
            file.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MediaGallery.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)


class SingleMediaView(APIView):
    serializer_class = MediaGallerySerializer

    def get(self, request, pk):
        try:
            queryset = MediaGallery.objects.get(id=pk)
            serializer = self.serializer_class(
                queryset, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except MediaGallery.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        file = MediaGallery.objects.get(id=pk)
        serializer = self.serializer_class(
            file, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
